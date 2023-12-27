import { Car } from "../../models/entity/car";
import CarsRepository from "../cars";

  //Create
  describe("POST Cars", () => {
    it("should create a new car", async () => {

      const carToCreate: Car = {
        car_name: "Vespa",
        car_rentperday: 66666,
        car_size: "Medium",
        car_img: "vespa.jpg",
      };

      const createdCar = await CarsRepository.createCar(carToCreate);

      
      expect(createdCar).toBeDefined();
      expect(createdCar.id).toBeDefined();
      expect(createdCar.car_name).toEqual(carToCreate.car_name);
      expect(createdCar.car_rentperday).toEqual(carToCreate.car_rentperday);
      expect(createdCar.car_img).toEqual(carToCreate.car_img);
      expect(createdCar.car_size).toEqual(carToCreate.car_size);
      
      await CarsRepository.deleteCarById(createdCar.id as number);
    });
  });

  //Read
  describe("GET Cars", () => {
    it("should return a car data", async () => {
  
      const carToCreate: Car = {
        id: 1,
        car_name: "Mio",
        car_rentperday: 99999,
        car_size: "Small",
        car_img: "mio.jpg",
      };
      const createdCar = await CarsRepository.createCar(carToCreate);
  
      const getCar = await CarsRepository.getCarsById(createdCar.id as number);
  
      await CarsRepository.deleteCarById(createdCar.id as number);
  
      expect(getCar[0].id).toEqual(createdCar.id);
      expect(getCar[0].car_name).toEqual(carToCreate.car_name);
      expect(getCar[0].car_rentperday).toEqual(carToCreate.car_rentperday);
      expect(getCar[0].car_img).toEqual(carToCreate.car_img);
      expect(getCar[0].car_size).toEqual(carToCreate.car_size);
    });
  });

  //Update
  describe("PATCH Cars", () => {
    it("should update an existing car", async () => {
  
      // Assuming a car already exists in the database
      const existingCar: Car = {
        car_name: "Old Car",
        car_rentperday: 30000,
        car_size: "Small",
        car_img: "old.jpg",
      };
  
      const createdCar = await CarsRepository.createCar(existingCar);
  
      // Update the existing car
      const updatedCarData: Car = {
        car_name: "Updated Car",
        car_rentperday: 35000,
        car_size: "Large",
        car_img: "update.jpg",
      };
  
      const updatedCar = await CarsRepository.updateCarById(
        createdCar.id as number,
        updatedCarData
      );
      const fetchedUpdatedCar = await CarsRepository.getCarsById(
        createdCar.id as number
      );
      
      expect(fetchedUpdatedCar).toBeDefined();
      expect(fetchedUpdatedCar[0].id).toEqual(createdCar.id);

      await CarsRepository.deleteCarById(updatedCar?.id as number);
    });
  });

  //Delete
  describe("DELETE Cars", () => {
    it("should delete an existing car", async () => {
  
      const carToDelete: Car = {
        id: 11,
        car_name: "Delete Car",
        car_rentperday: 40000,
        car_size: "Large",
        car_img: "create-delete.jpg",
      };
  
      const createdCar = await CarsRepository.createCar(carToDelete);
  
      const deletedCar = await CarsRepository.deleteCarById(
        createdCar.id as number
      );
  
      expect(deletedCar).toBeDefined();
      
    });
  });