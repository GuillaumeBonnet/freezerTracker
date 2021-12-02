import { BackendServiceHttp } from "../app/Services/backend-http.service";

export const environment = {
	production: true,
	API_ROOT_URL: 'https://freezer-practice.herokuapp.com/api',
	DOMAIN: 'freezer-practice.herokuapp.com',
	BackendService: BackendServiceHttp
};
