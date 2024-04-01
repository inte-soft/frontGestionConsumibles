import { Component, ElementRef, ViewChild } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-modal-qrimage',
  templateUrl: './modal-qrimage.component.html',
  styleUrl: './modal-qrimage.component.css',
})
export class ModalQrimageComponent {
  @Input() isOpenQr = false;
  @Input() image: any = null;
  @Output() onCloseModalQR = new EventEmitter<void>();
  //@Output() onSaveQr = new EventEmitter<void>();

  titulo = 'SMART DING';

  eslogan1 =
    '“¡Sé verde con Smart DING! Adopta la tecnología QR para tus proyectos y';
  eslogan2 = 'haz una diferencia en la protección de nuestro medio ambiente”';

  @ViewChild('imgQr', { static: true }) imgQr!: ElementRef;
  @ViewChild('imgCelular', { static: true }) imgCelular!: ElementRef;
  @ViewChild('imgDemco', { static: true }) imgDemco!: ElementRef;
  @ViewChild('miCanvas', { static: true }) miCanvas!: ElementRef;

  colocarImagen() {
    let camvas = this.miCanvas.nativeElement;
    let ctx = camvas.getContext('2d');
    let ctx1 = camvas.getContext('2d');
    let ctx2 = camvas.getContext('2d');
    let img = this.imgCelular.nativeElement;
    let img1 = this.imgQr.nativeElement;
    let img2 = this.imgDemco.nativeElement;

    // Establecer tamaño de fuente específico para el título
    const tituloFontSize = 60;
    ctx.font = `${tituloFontSize}px Arial`;
    ctx.fillStyle = 'green';

    ctx1.font = '13px Arial';
    ctx2.font = '13px Arial';
    ctx.fillStyle = 'green';

    // Tamaño del lienzo
    const canvasWidth = 640;
    const canvasHeight = 550;

    // Tamaño de las imágenes
    const ancho = 400; // Ancho de la primera imagen
    const alto = 390; // Alto de la primera imagen
    const ancho1 = 300; // Ancho de la segunda imagen
    const alto1 = 300; // Alto de la segunda imagen
    const ancho2 = 90; // Ancho de la tercera imagen
    const alto2 = 40; // Alto de la tercera imagen

    // Centrar las imágenes horizontalmente en el lienzo
    const x1 = (canvasWidth - ancho) / 2; // Centrar la primera imagen horizontalmente
    const x2 = (canvasWidth - ancho1) / 2; // Centrar la segunda imagen horizontalmente
    let x3 = (canvasWidth - ancho2) / 2; // Centrar la tercera imagen horizontalmente

    // Ajustar la coordenada x3 para mover la imagen más a la derecha
    x3 += 160; // Ajustar para mover la imagen hacia la derecha

    // Centrar las imágenes verticalmente en el lienzo
    const y1 = (canvasHeight - alto) / 2; // Centrar la primera imagen verticalmente
    const y2 = y1 + 70; //Separar img1 de img por 50 píxeles

    // Calcular la coordenada y para la tercera imagen
    const y3 = Math.max(y1 + alto, y2 + alto1 + 60); // Colocar la tercera imagen debajo de las otras imágenes

    // Dibujar las imágenes centradas en el lienzo
    ctx.drawImage(img, x1, y1, ancho, alto);
    ctx.drawImage(img1, x2, y2, ancho1, alto1);
    ctx.drawImage(img2, x3, y3, ancho2, alto2);

    // Centrar el título verticalmente cerca de la primera imagen
    const titulo = this.titulo;
    const tituloWidth = ctx.measureText(titulo).width;
    const tituloX = x1 + ancho / 2 - tituloWidth / 2;
    const tituloY = y1 - 10; // Ajusta el valor entre el título y la imagen

    // Dibujar el título
    ctx.fillText(titulo, tituloX, tituloY);

    // Centrar los textos verticalmente debajo de la img1
    const texto1Height = 13; // Altura del texto eslogan1
    const texto2Height = 13; // Altura del texto eslogan2

    const centerY1 = y2 + alto1 + texto1Height + 25; // 55 es un margen
    const centerY2 = y2 + alto1 + texto2Height + 45; // 750 es un margen adicional

    // Dibujar los textos centrados verticalmente debajo de la img1
    ctx.fillText(this.eslogan1, 105, centerY1);
    ctx.fillText(this.eslogan2, 110, centerY2);

    // Dibujar un borde alrededor de las img y img1
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.10)'; // Color y transparencia del borde
    ctx.lineWidth = 1; // Ancho del borde
    // Llamar a la función para dibujar rectángulos con esquinas redondeadas
    this.roundedRect(ctx, x1, y1, ancho, alto, 10); // Redondear las esquinas de la primera imagen
    this.roundedRect(ctx, x2, y2, ancho1, alto1, 10); // Redondear las esquinas de la segunda imagen
    this.roundedCanvas(ctx, canvasWidth, canvasHeight, 30); // Redondear las esquinas del canvas
  }

  roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.stroke();
  }

  roundedCanvas(ctx: CanvasRenderingContext2D, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.arcTo(width, 0, width, height, radius);
    ctx.arcTo(width, height, 0, height, radius);
    ctx.arcTo(0, height, 0, 0, radius);
    ctx.arcTo(0, 0, width, 0, radius);
    ctx.closePath();
    ctx.clip(); // Establece la región de recorte para que el contenido fuera del camino de recorte no se dibuje
  }

  saveQr() {
    this.colocarImagen();
    let camvas = this.miCanvas.nativeElement;
    let imagen = camvas.toDataURL();
    let newImg = imagen.replace(
      /^data:image\/jpg/,
      'data:aplication/octet-stream'
    );
    $('#download').attr('download', 'image/QR').attr('href', newImg);
  }

  closeModal() {
    this.onCloseModalQR.emit();
  }
}
