import fs from "fs";
import path from "path";

export class TestDataManager {

    static getData<T>(fileName: string): T {

        const filePath = path.join(
            process.cwd(),
            "src",
            "common",
            "testdata",
            `${fileName}.json`
        );

        const fileContent = fs.readFileSync(
            filePath,
            "utf-8"
        );

        return JSON.parse(fileContent) as T;
    }

}