import {inject, Injectable } from "@angular/core";
import LocalRepository from '../local-object-store/local-repository';
import { Library } from "src/app/_models/library/library";
import {Local} from "d3";

@Injectable({
  providedIn: 'root'
})
export class LocalRepositoryService {
  private db: LocalRepository = inject(LocalRepository);
  public async addLibary(value: Library) {
    return await this.db.libraries.add(value);
  }

  public async getAllLibraries(){
    return this.db.libraries.toCollection();
  }
}
