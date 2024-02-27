import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    try {
      const subscriberSumsByRegion = await this.prisma.store.groupBy({
        by: ['region'],

        _count: true,
      });
      console.log(
        'AppService ~ getAll ~ subscriberSumsByRegion:',
        subscriberSumsByRegion,
      );

      const data = this.prisma.store.findMany();

      return data;
    } catch (e) {
      console.log('Error', e.message);
    }
  }

  async addRow(row) {
    try {
      const data = {
        ...row,
        units: +row.units,
        item: +row.item,
        subscribers: +row.subscribers,
      };
      const newRow = await this.prisma.store.create({ data });
      console.log('AppService ~ addRow ~ newRow:', newRow);
      return newRow;
    } catch (e) {
      console.log('Error', e.message);
    }
  }
}
