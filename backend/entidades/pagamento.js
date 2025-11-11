class Pagamento {
    constructor(id, dataPagamento, valorPago, status, idTransacaoGateway) {
        this.id = id
        this.dataPagamento = dataPagamento
        this.valorPago = valorPago
        this.status = status
        this.idTransacaoGateway = idTransacaoGateway
    }
}

export default Pagamento