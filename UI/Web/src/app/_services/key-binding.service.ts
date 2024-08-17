import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {KeyBinding} from "../_models/key-binding/key-binding";
import { ReaderType } from '../_models/key-binding/reader-type';

@Injectable({
    providedIn: 'root'
})
export class KeyBindingService {
    baseUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) { }

    // Not sure about these endpoints
    saveKeyBinding(keyBinding: KeyBinding) {
        return this.httpClient.post(this.baseUrl + 'keyBinding/update', keyBinding);
    }
    getAllKeyBindings() {
        return this.httpClient.get<Array<KeyBinding>>(this.baseUrl + 'keybinding');
    }
    getKeyBindingByType(readerType: ReaderType) {
        return this.httpClient.get<KeyBinding>(this.baseUrl + 'keyBinding?readerType=' + readerType);
    }
    getKeyBinding(keyBindingId: number) {
        return this.httpClient.get<KeyBinding>(this.baseUrl + 'keyBinding?keyBindingId=' + keyBindingId);
    }
    deleteKeyBinding(keyBindingId: number) {
        return this.httpClient.delete(this.baseUrl + 'keyBinding?keyBindingId=' + keyBindingId);
    }
}