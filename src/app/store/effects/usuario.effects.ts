import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError } from 'rxjs/operators';
import { cargarUsuario } from "../actions";
import { UsuarioService } from '../../services/usuario.service';
import { cargarUsuarioSuccess, cargarUsuarioError } from '../actions';
import { of } from "rxjs";

@Injectable()
export class UsuarioEffects {

    constructor(private actions$: Actions, private usuariosService: UsuarioService) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(cargarUsuario),
            // tap( data => console.log('effect tap', data)),
            mergeMap(
                ( action ) => this.usuariosService.getUserById( action.id )
                    .pipe(
                        // tap(data => console.log('getUsers effect', data )),
                        map(user => cargarUsuarioSuccess({ usuario: user })),
                        catchError(err => of(cargarUsuarioError({ payload: err })))
                    )
            )
        )
    );

}