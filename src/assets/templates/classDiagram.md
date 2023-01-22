```mermaid
classDiagram
  class Car {
    color
    model
    +start()
    #run()
    #stop()
  }
  Car <|-- Bus
  Car *-- Tire
  Car *-- Engine
  Bus o-- Driver
```
