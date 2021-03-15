import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { cargarUsuarios } from "../actions";
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuariosSuccess, cargarUsuariosError } from '../actions/usuarios.actions';
import { of } from "rxjs";

@Injectable()
export class UsuariosEffects {

    constructor(private actions$: Actions, private usuariosService: UsuarioService ) {}

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType( cargarUsuarios ),
            // tap( data => console.log('effect tap', data)),
            mergeMap(
                () => this.usuariosService.getUsers()
                    .pipe(
                        // tap(data => console.log('getUsers effect', data ))
                        map( users => cargarUsuariosSuccess({ usuarios: users }) ),
                        catchError( err => of(cargarUsuariosError({ payload: err })))
                    )
            )
        )
    );

}