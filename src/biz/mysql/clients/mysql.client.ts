import mysql = require("mysql2");
import { CustomInternalServerErrorException } from "../../../http/http.exception";

export default class MySQLClient {
  static fileName: string = __filename;
  static pools: any = {};

  // Its private, because we don't want any instances of this class
  // because all its properties and functions are static and they are found on class itself not its instances
  private constructor() {}

  // manage a set of pools by name (config will be required to create the pool)
  static async getPool(name: string, config?: any): Promise<any> {
    if (!Object.prototype.hasOwnProperty.call(MySQLClient.pools, name)) {
      let pool: mysql.Pool;

      try {
        const start = new Date().getTime();

        console.log(`[MYSQLDB] - Creating pool: [${name}]`);
        pool = mysql.createPool({ ...config });
        const end = new Date().getTime();
        const time = end - start;

        console.log(
          `[MYSQLDB] - Pool [${name}] created in ${time} milliseconds and ready for use`
        );
      } catch (error) {
        new CustomInternalServerErrorException(
          `Could NOT connect to MySQL db: ${name}`,
          undefined,
          undefined,
          error
        ).exception;
      }
      MySQLClient.pools[name] = pool;
    }

    return MySQLClient.pools[name];
  }

  /* close all pools NOT USED YET */
  static closeAll() {
    return Promise.all(
      Object.values(MySQLClient.pools).map((pool: mysql.Pool) => {
        pool.end((error) => {
          if (error) throw error;
          // all connections in the pool have ended
        });
      })
    );
  }

  static async runQuery(
    name: string,
    query: string,
    config: any,
    data?: {}
  ): Promise<any> {
    const reqDate = new Date();
    let pool: mysql.Pool;
    let connectionsInfo = {};

    try {
      pool = await MySQLClient.getPool(name, config);
      connectionsInfo = {
        poolTimeout: pool.config.connectTimeout,
      };
      console.log(`[MYSQLDB] - Query: ${query}`);
    } catch (error) {
      throw error;
    }

    try {
      return new Promise((resolve, reject) => {
        pool.query(query, (error, result) => {
          // Connection is automatically released when query resolves
          if (error) {
            return reject(error);
          }
          console.log(`[MYSQLDB] - Query result:`);
          console.log(result);
          console.log(" ");

          resolve(result);
        });
      });
    } catch (error) {
      throw new CustomInternalServerErrorException(
        `Could NOT exec query: ${query}`,
        `Tried to reach db: ${name}`,
        undefined,
        error
      ).exception;
    }
  }
}
