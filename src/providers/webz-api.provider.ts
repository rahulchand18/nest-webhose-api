import { WebzApiService } from 'src/services/webz-api.service';

export const WebzApiProvider = {
  provide: WebzApiService,
  useClass: WebzApiService,
};
