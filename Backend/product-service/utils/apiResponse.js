class ApiResponse {
    constructor(res, statusCode, data) {
        this.res = res;
        this.statusCode = statusCode;
        this.data = data;
        
        this.send();
    }
    
    send() {
        this.res.status(this.statusCode).json({
            success: this.statusCode < 400,
            ...this.data
        });
    }
}

module.exports = ApiResponse;