import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                    type: 'mysql',
                    host: configService.get('db.mysql.host'),
                    port: +configService.get('db.mysql.port'),
                    username: configService.get('db.mysql.user'),
                    password: configService.get('db.mysql.password'),
                    database: configService.get('db.mysql.database'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: true,
                    logging: true
            })
        })
    ]
})
export class DbModule { }