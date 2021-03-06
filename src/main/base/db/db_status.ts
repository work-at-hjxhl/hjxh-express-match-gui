export const DB_TABLE_NOT_EXISTED = 'DB_TABLE_NOT_EXISTED';
export type DB_TABLE_NOT_EXISTED = typeof DB_TABLE_NOT_EXISTED;

export const DB_TIMEOUT = 'DB_TIMEOUT';
export type DB_TIMEOUT = typeof DB_TIMEOUT;

export const DB_UNKNOWN = 'DB_UNKNOWN';
export type DB_UNKNOWN = typeof DB_UNKNOWN;

export type DbStatusBase = DB_TABLE_NOT_EXISTED | DB_TIMEOUT | DB_UNKNOWN;

export const DB_INSERT_SUCCESS = 'DB_INSERT_SUCCESS';
export type DB_INSERT_SUCCESS = typeof DB_INSERT_SUCCESS;

export const DB_INSERT_DUPLICATED = 'DB_INSERT_DUPLICATED';
export type DB_INSERT_DUPLICATED = typeof DB_INSERT_DUPLICATED;

export type DbInsertStatus = DbStatusBase | DB_INSERT_SUCCESS | DB_INSERT_DUPLICATED;

export const DB_UPDATED = 'DB_UPDATED';
export type DB_UPDATED = typeof DB_UPDATED;

export const DB_UPDATE_DECLINED = 'DB_UPDATE_DECLINED';
export type DB_UPDATE_DECLINED = typeof DB_UPDATE_DECLINED;

export type DbUpdateStatus = DbStatusBase | DB_UPDATED | DB_UPDATE_DECLINED;
