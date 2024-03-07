import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Laptop } from "../entity/Laptop";
import { Specs } from "../entity/Specs";
import dotenv from "dotenv";
import { catchAsync } from "../utils/catchAsync";
dotenv.config();

const laptopRepository = AppDataSource.getRepository(Laptop);
const specsRepository = AppDataSource.getRepository(Specs);

export const save = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const { brand, model, price, specs } = request.body;
    const { screenSize, processor, ram, storage } = specs;

    const specsObj = Object.assign(new Specs(), {
      screenSize,
      processor,
      ram,
      storage,
    });
    const laptop = Object.assign(new Laptop(), {
      brand,
      model,
      price,
      specs,
    });
    const saved = await laptopRepository.save(laptop);
    return response.status(200).send(saved);
  }
);

export const index = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    return response.status(200).send(
      await laptopRepository.find({
        relations: ["specs"],
      })
    );
  }
);

export const remove = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);

    let laptopToRemove = await laptopRepository.findOne({
      where: { id },
      relations: ["specs"],
    });

    if (!laptopToRemove) {
      return response.status(404).json({ message: "Laptop does not exist" });
    }
    specsRepository.remove(laptopToRemove.specs);
    return response
      .status(200)
      .send(await laptopRepository.remove(laptopToRemove));
  }
);

export const update = catchAsync(
  async (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id);

    const existingLaptop = await laptopRepository.findOne({
      where: { id },
      relations: ["specs"],
    });

    if (!existingLaptop) {
      return response.status(404).json({ error: "Laptop not found" });
    }

    // Update laptop properties
    existingLaptop.brand = request.body.brand || existingLaptop.brand;
    existingLaptop.model = request.body.model || existingLaptop.model;
    existingLaptop.price = request.body.price || existingLaptop.price;

    // Update specs properties (assuming it's a OneToOne relationship)
    if (existingLaptop.specs) {
      existingLaptop.specs.screenSize =
        request.body.specs.screenSize || existingLaptop.specs.screenSize;
      existingLaptop.specs.processor =
        request.body.specs.processor || existingLaptop.specs.processor;
      existingLaptop.specs.ram =
        request.body.specs.ram || existingLaptop.specs.ram;
      existingLaptop.specs.storage =
        request.body.specs.storage || existingLaptop.specs.storage;
    }

    // Save the updated laptop
    await laptopRepository.save(existingLaptop);

    return response
      .status(200)
      .json({ message: "Laptop updated successfully" });
  }
);
