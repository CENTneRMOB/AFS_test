const { drizzle } = require("drizzle-orm/node-postgres");
const { Client } = require("pg");
const dbsConfig = require("../config").dbs;
const logger = require("./logger.service")(module);

/**
 * Базовый класс сервиса работы с базой данных
 */
class Database {
  #uri;

  #id;

  #database;

  #connection;

  constructor(config) {
    this.#uri = config.uri;
    this.#id = config.id;
    this.#database = config.database;
  }

  /**
   * Открывает соединение с БД.
   * @return {Promise<void>}
   */
  async connect() {
    try {
      const client = new Client({ connectionString: this.#uri });
      await client.connect();
      this.#connection = client;

      logger.info(`Connected to ${this.#id}`);
    } catch (error) {
      logger.error(`Unable to connect to ${this.#id}:`, error.message);
    }
  }

  /**
   * Закрывает соединение с БД.
   * @return {Promise<void>}
   */
  async disconnect() {
    if (this.#connection) {
      try {
        await this.#connection.end();

        logger.info(`Disconnected from ${this.#id}`);
      } catch (error) {
        logger.error(`Unable to disconnect from ${this.#id}:`, error.message);
      }
    }
  }

  /**
   * Возвращает объект соединения с БД,
   * @return {Object}
   */
  get connection() {
    return this.#connection;
  }

  /**
   * Возвращает инстанс db для работы с ней,
   * @return {Object}
   */
  get db() {
    return drizzle(this.#connection);
  }
}

const sampleDB = new Database(dbsConfig.sample_db);

module.exports = { sampleDB };
