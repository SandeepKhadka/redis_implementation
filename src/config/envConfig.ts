import "dotenv/config";
import { cleanEnv,num, str} from "envalid";

console.log(process.env.PORT);
const envConfig = cleanEnv(process.env, {
    PORT: num(),

    REDIS_URL:str(),

    DB_HOST:str(),
    DB_USER:str(),
    DB_NAME:str(),
    DB_PASSWORD:str(),
    DB_PORT:num(),
})

export default envConfig;