import { createAction, props } from '@ngrx/store';
import { Usuario } from '../../models/usuario.model';

export const cargarUsuario = createAction('[Usuarios] Cargar usuario', props<{ id: string }>());
export const cargarUsuarioSuccess = createAction('[Usuarios] Cargar usuario success', props<{ usuario: Usuario }>());
export const cargarUsuarioError = createAction('[Usuarios] Cargar usuario error', props<{ payload: any }>());