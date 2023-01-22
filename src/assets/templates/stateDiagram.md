```mermaid
stateDiagram-v2
  [*] --> step1
  step1 --> [*]

  step1 --> step2
  step2 --> step1
  step2 --> step3
  step3 --> [*]
```
