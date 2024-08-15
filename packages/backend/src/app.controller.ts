import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { NetworkApiQuery } from './decorators';
import {
  OptimalRouteRequestBodyDto,
  OptimalRouteResponseDto,
  QueryNetworkDto,
} from './dto';

@ApiHeader({
  name: 'apiKey',
  description: 'API Key',
})
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({
    description: 'Returns a message',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
        },
      },
    },
  })
  @Get('/')
  getHealth() {
    return this.appService.getHealth();
  }

  @ApiOkResponse({
    description: 'Returns the optimal route',
    type: OptimalRouteResponseDto,
  })
  @NetworkApiQuery()
  @Post('/optimal_route')
  getOptimalRoute(
    @Query() query: QueryNetworkDto,
    @Body() body: OptimalRouteRequestBodyDto,
  ): OptimalRouteResponseDto {
    return this.appService.getOptimalRoute(query.network, body);
  }

  @NetworkApiQuery()
  @Get('/asset_info')
  getAssetInfo(@Query() query: QueryNetworkDto): {
    network: string;
  } {
    return { network: query.network };
  }

  @NetworkApiQuery()
  @Get('/last_trades')
  getLastTrades(@Query() query: QueryNetworkDto): {
    network: string;
  } {
    return { network: query.network };
  }

  @NetworkApiQuery()
  @Get('/info')
  getInfo(@Query() query: QueryNetworkDto): {
    network: string;
  } {
    return { network: query.network };
  }

  @NetworkApiQuery()
  @Post('/update_database')
  updateDatabase(@Query() query: QueryNetworkDto) {
    return this.appService.updateDatabase(query.network);
  }
}
