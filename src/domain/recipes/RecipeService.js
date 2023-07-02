import http from '@/http'

export default class FotoService {

    constructor(){
        this._resource = http.get()
    }

}