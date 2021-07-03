const rearX = 80;
const rearY = 120;
const frontX = 280;
const frontY = 180;
const passengerSideX = 465;
const passengerSideY = 162;
const driverSideX = 465;
const driverSideY = 362;
export const carParts = {
  exterior: [
      { type: "Top", img: "top.png", x:rearX, y:rearY },// start Rear side
      { type: "Boot", img: "Boot.png", x:rearX - 10, y:rearY + 170 },
      { type: "Left Taillight", img: "left_taillight.png", x:rearX - 65, y:rearY + 210 },
      { type: "Right Taillight", img: "right_taillight.png", x:rearX + 135, y:rearY + 210 },
      { type: "Rear Passenger Side Bumper", img: "rear_passenger_side_bumper.png", x:rearX - 35, y:rearY + 250 },
      { type: "Rear Driver Side Bumper", img: "rear_driver_side_bumper.png", x:rearX + 51, y:rearY + 250 },
      { type: "Windshield", img: "windshield.png", x:frontX, y:frontY }, // start front side
      { type: "Bonnet", img: "bonnet.png", x:frontX, y:frontY + 88 },
      { type: "Left Headlight", img: "left_headlight.png", x:frontX - 20, y:frontY + 133 },
      { type: "Right Headlight", img: "right_headlight.png", x:frontX + 130, y:frontY + 133 },
      { type: "Left Bumper", img: "left_bumper.png", x:frontX -10, y:frontY + 173 },
      { type: "Right Bumper", img: "right_bumper.png", x:frontX + 70, y:frontY + 173 },
      { type: "Passenger Side fender", img: "passenger_side_fender.png", x:passengerSideX, y:passengerSideY },
      { type: "Passenger Side Front Door", img: "passenger_side_front_door.png", x:passengerSideX + 85, y:passengerSideY - 42 },
      { type: "Passenger Side Rear Door", img: "passenger_side_rear_door.png", x:passengerSideX + 185, y:passengerSideY - 42 },
      { type: "Passenger Side Quarter", img: "passenger_side_quarter.png", x:passengerSideX + 245, y:passengerSideY - 42 },
      { type: "Passenger Side Front Rim", img: "passenger_side_front_rim.png", x:passengerSideX -40, y:passengerSideY+50 },
      { type: "Passenger Side Front Tyre", img: "passenger_side_front_tyre.png", x:passengerSideX +5, y:passengerSideY+43 },
      { type: "Passenger Side Rocker Panel",img: "passenger_side_rocker_panel.png",  x:passengerSideX +95, y:passengerSideY+83},
      { type: "Passenger Side Rear Tyre", img: "passenger_side_rear_tyre.png", x:passengerSideX +270, y:passengerSideY+48  },
      { type: "Passenger Side Rear Rim", img: "passenger_side_rear_rim.png", x:passengerSideX +335, y:passengerSideY+55 },
      { type: "Driver Side Quarter", img: "driver_side_quarter.png", x:driverSideX, y:driverSideY },
      { type: "Driver Side Rear Door", img: "driver_side_rear_door.png",x:driverSideX +50, y:driverSideY },
      { type: "Driver Side Front Door", img: "driver_side_front_door.png", x:driverSideX +140, y:driverSideY },
      { type: "Driver Side Fender", img: "driver_side_fender.png", x:driverSideX +240, y:driverSideY + 42 },
      { type: "Driver Side Rear Rim", img: "driver_side_rear_rim.png",  x:driverSideX -40, y:driverSideY + 100 },
      { type: "Driver Side Rear Tyre", img: "driver_side_rear_tyre.png", x:driverSideX+2, y:driverSideY + 100 },
      { type: "Driver Side Rocker Panel", img: "driver_side_rocker_panel.png", x:driverSideX+95, y:driverSideY + 125 },
      { type: "Driver Side Front Tyre", img: "driver_side_front_tyre.png", x:driverSideX+260, y:driverSideY + 90 },
    { type: "Driver Side Front Rim", img: "driver_side_front_rim.png", x:driverSideX+330, y:driverSideY + 95 },
  ],
};
