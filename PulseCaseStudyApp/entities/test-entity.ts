import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Test {
  @PrimaryKey()
  _id!: number;

  @Property()
  mood: string;

  @Property()
  level: number;

  constructor(mood: string, level: number) {
    this.mood = mood;
    this.level = level;
  }
}
