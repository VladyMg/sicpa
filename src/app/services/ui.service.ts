import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    public toastController: ToastController) { }

  alertConfirm(header: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alertController.create({
        mode: 'ios',
        header,
        message: '¿Desea continuar?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'medium',
            id: 'cancel-button',
            handler: () => resolve(true)
          }, {
            text: 'Confirmar',
            cssClass: 'danger',
            id: 'confirm-button',
            handler: () => resolve(false)
          }
        ]
      });
      await alert.present();
    });
  }
  // Función para presentar mensajes de alerta personalizados cómo servicio
  async alertInfo(message: string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // Función para presentar Loader personalizado como servicio
  async presentLoader(message: string) {
    const loader = await this.loadingController.create({
      message
    });
    await loader.present()
      .catch(e => this.alertInfo(String(e)));

    return loader;
  }

  // Función para cerrar Loader
  async dismissLoader(loader: HTMLIonLoadingElement) {
    await loader.dismiss()
      .catch(e => this.alertInfo(String(e)));
  }

  async presentToast(message: string, color: string = 'light') {
    const toast = await this.toastController.create({
      position: 'top',
      message,
      duration: 3000,
      color
    });
    toast.present();
  }
}
