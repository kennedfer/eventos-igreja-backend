import { Op } from "sequelize";
import { ChurchEvent } from "../models/church-events";

export class EventsService {
  async getByPeriod(month: number, year: number, day?: number): Promise<ChurchEvent[]> {
    let startDate: Date;
    let endDate: Date;

    if (day) {
      startDate = new Date(year, month - 1, day, 0, 0, 0);
      endDate = new Date(year, month - 1, day, 23, 59, 59);
    } else {
      startDate = new Date(year, month - 1, 1, 0, 0, 0);
      endDate = new Date(year, month, 0, 23, 59, 59);
    }

    return await ChurchEvent.findAll({
      where: { date: { [Op.between]: [startDate, endDate] } },
      order: [["date","ASC"],["startHour", "ASC"]],
    });
  }

  async getAll(): Promise<ChurchEvent[]> {
    return await ChurchEvent.findAll();
  }

  async create(event: ChurchEvent): Promise<ChurchEvent> {
    return await ChurchEvent.create(event);
  }

  async delete(id: number): Promise<boolean> {
    const churchEvent = await ChurchEvent.findOne({ where: { id } });
    if (!churchEvent) return false;

    await churchEvent.destroy();
    return true;
  }

  async update(id: number, churchEventData: Partial<ChurchEvent>): Promise<ChurchEvent | null> {
    const churchEvent = await ChurchEvent.findOne({ where: { id } });
    if (!churchEvent) return null;

    churchEvent.set(churchEventData);
    await churchEvent.save();
    return churchEvent;
  }

  async findById(id: number): Promise<ChurchEvent | null> {
    return await ChurchEvent.findOne({ where: { id } });
  }
}
