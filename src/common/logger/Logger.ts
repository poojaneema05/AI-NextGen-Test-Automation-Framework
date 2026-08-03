import winston from "winston";


export class Logger {

    private static logger = winston.createLogger({

        level: "info",

        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
        ),

        transports: [

            new winston.transports.Console(),

            new winston.transports.File({
                filename: "logs/framework.log"
            })

        ]

    });


    static info(message: string): void {

        this.logger.info(message);

    }


    static error(message: string): void {

        this.logger.error(message);

    }


    static warn(message: string): void {

        this.logger.warn(message);

    }


    static debug(message: string): void {

        this.logger.debug(message);

    }

}