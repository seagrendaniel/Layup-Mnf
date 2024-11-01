# Airplane Flight Path Simulator

This application simulates the control of an airplane on a 2D canvas, where users can adjust the airplane's yaw angle and airspeed. The airplane's trajectory is dynamically updated and displayed as it moves across the canvas, reset whenever it crosses the canvas boundary.

## Features

- **Yaw Angle Control**: Adjusts the slope of the airplane's flight path.
- **Airspeed Control**: Controls the airplane’s horizontal speed.
- **Real-Time Path Visualization**: Displays the airplane's path on the canvas, resetting to the starting position when crossing any boundary.

## Getting Started

1. Ensure that the `airplane.png` image file is in the same directory as the HTML and JavaScript files.
2. Open the `index.html` file in a web browser to start the application.

## Controls

- **Yaw Angle**:  
  - Press the `+` button to increase the yaw angle up to a maximum of `180°`, creating an upward slope.
  - Press the `-` button to decrease the yaw angle down to a minimum of `-180°`, creating a downward slope.
- **Airspeed**:  
  - Press `+` to increase the speed by `10 knots` per press.
  - Press `-` to decrease the speed by `15 knots` per press.
- **Start/Stop**:  
  - Press the `Start` button to initiate the airplane's movement.
  - Press `Stop` to halt the movement.
- **Reset**:  
  - Press the `Reset` button to restart the simulation, resetting all values to their initial states.

## Flight Path Behavior

- **Trajectory Calculation**:
  - The airplane's position is updated based on its yaw angle and airspeed. The following formula is used to calculate movement:
    - `dx = cos(yawAngle) * airspeed * knotsToPixels`
    - `dy = sin(yawAngle) * airspeed * knotsToPixels`
  - The yaw angle controls the vertical slope of the path, and the airspeed determines the rate of horizontal movement.

- **Boundary Reset**:
  - When the airplane crosses any canvas boundary (top, bottom, or right), it resets to the starting position at the left center of the canvas with a yaw angle reset to `0°`.
  - The flight path clears each time this reset occurs.

## Notes

- **Yaw Angle Display**: The display shows positive or negative yaw values based on the direction of the airplane's movement relative to its center position.
- **Flight Path Reset**: The path resets every time the airplane crosses a boundary, resuming from the left edge of the canvas.

## Dependencies

This app relies on basic HTML, CSS, and JavaScript. No external libraries are required.

