class Order{
    constructor(
        public endereco: string,
        public number: number,
        public optionalAddress: string,
        public paymentOptional: string,
        public orderItems: OrderItem[] = [],
        public id?: string
        ){}
}

class OrderItem{
    constructor(public quantity: number, public menuId: string){
    }
}

export {Order, OrderItem};