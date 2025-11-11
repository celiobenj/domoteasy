class Usuario {
    constructor(id, nome, email, senhaHash, tipoAssinatura) {
        this.id = id
        this.nome = nome
        this.email = email
        this.senhaHash = senhaHash
        this.tipoAssinatura = tipoAssinatura
    }
}

export default Usuario