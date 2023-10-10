import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 private cardNumber: string = '';
 private cardExpiry: string = '';
 private cardCvv: string = '';
 private resultMessage: string = '';


  constructor(private http: HttpClient) {}

  async processPayment() {
    const paymentData = {
      cardNumber: this.cardNumber,
      cardExpiry: this.cardExpiry,
      cardCvv: this.cardCvv,
    };

    try {
      const response = await this.http
        .post<any>('/process-payment', paymentData)
        .toPromise();

      if (response.status === 'approved') {
        this.resultMessage = 'Pagamento aprovado!';
      } else {
        this.resultMessage = 'Pagamento não aprovado.';
      }
    } catch (error) {
      console.error(error);
      this.resultMessage = 'Erro ao processar o pagamento.';
    }
  }
}

