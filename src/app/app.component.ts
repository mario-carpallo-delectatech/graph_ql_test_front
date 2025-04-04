import { provideHttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'graph_ql_test_front';
}

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri: 'https://sandbox.restaurant-directory-back.delectame.com/graphql' }),
    cache: new InMemoryCache()
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideApollo(() => createApollo(inject(HttpLink)))
  ]
});