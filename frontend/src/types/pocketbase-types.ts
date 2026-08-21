/**
 * This file was @generated using pocketbase-typegen
 */

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
  Settings = 'settings',
  Tasks = 'tasks',
  Users = 'users'
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString
  created: IsoDateString
  updated: IsoDateString
  collectionId: string
  collectionName: Collections
  expand?: T
}

export type AuthSystemFields<T = never> = {
  email: string
  emailVisibility: boolean
  username: string
  verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum SettingsThemeOptions {
  system = 'system',
  light = 'light',
  dark = 'dark'
}
export type SettingsRecord = {
  remindByEmailEnabled?: boolean
  remindEmail?: string
  theme?: SettingsThemeOptions
  user: RecordIdString
}

export type TasksRecord<Thistory = unknown> = {
  category?: string
  daysRemind?: number
  daysRepeat: number
  description?: string
  history?: null | Thistory
  name: string
  remindByEmail?: boolean
  user: RecordIdString
}

export type UsersRecord = {
  authWithPasswordAvailable?: boolean
  avatar?: string
  name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type SettingsResponse<Texpand = unknown> = Required<SettingsRecord> &
  BaseSystemFields<Texpand>
export type TasksResponse<Thistory = unknown, Texpand = unknown> = Required<
  TasksRecord<Thistory>
> &
  BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> &
  AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
  settings: SettingsRecord
  tasks: TasksRecord
  users: UsersRecord
}

export type CollectionResponses = {
  settings: SettingsResponse
  tasks: TasksResponse
  users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
  collection(idOrName: 'settings'): RecordService<SettingsResponse>
  collection(idOrName: 'tasks'): RecordService<TasksResponse>
  collection(idOrName: 'users'): RecordService<UsersResponse>
}
