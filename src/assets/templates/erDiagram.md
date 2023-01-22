```mermaid
erDiagram
  Customer {
    string id
    string name
    string mail
  }
  Order {
    string id
    string customer_id
    string order_date
  }
  OrderDetail {
    string id
    string order_id
    string price_without_tax
  }
  Customer ||--o{ Order : text
  Order ||--|{ OrderDetail : text
```
