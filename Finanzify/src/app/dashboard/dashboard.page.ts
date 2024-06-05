import { Component, Host, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonFooter, LoadingController, AlertController, IonHeader, IonTitle, IonToolbar, IonFabButton, IonItemDivider, IonTextarea, IonFab, IonFabList, IonCard, IonCardHeader, IonCardTitle, IonGrid, IonCol, IonRow, Platform, IonicSlides } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { VerticalBarChartComponent } from '../components/vertical-bar-chart/vertical-bar-chart.component';
import { PieGridComponent } from '../components/pie-grid/pie-grid.component';
import { LegendPosition } from '@swimlane/ngx-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PieChartComponent } from '../components/pie-chart/pie-chart.component';
import { TreeMapChartComponent } from '../components/treemap-chart/treemap-chart.component';
import { NumberCardChartComponent } from '../components/number-card-chart/number-card-chart.component';
import { GaugeChartComponent } from '../components/gauge-chart/gauge-chart.component';
import { GroupedVerticalChartComponent } from '../components/grouped-vertical-chart/grouped-vertical-chart.component';
import { UserService } from '../services/UserService';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, VerticalBarChartComponent, NgClass, PieGridComponent, PieChartComponent, TreeMapChartComponent, NumberCardChartComponent, GaugeChartComponent, GroupedVerticalChartComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //imports: [IonicModule, CommonModule, FormsModule,VerticalBarChartComponent,NgClass,IonGrid,IonCol,IonRow,IonHeader, IonFooter, IonButtons, IonButton, IonFabButton,IonItemDivider,IonTextarea,IonFabButton,IonFab,IonFabList,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,PieGridComponent,PieChartComponent,TreeMapChartComponent,NumberCardChartComponent,GaugeChartComponent,GroupedVerticalChartComponent]
})
export class DashboardPage implements OnInit {
  usuario: any;
  pruebas: any = [];
  nombre: string = '';
  email: string = '';
  view: any;
  legendPosition: LegendPosition = LegendPosition.Right;
  below: boolean = false;
  datos_salario_ahorros: any[] = [];
  datos_gastos: any[] = [];
  datos_anuales: any[] = [];
  datos_gauge: any[] = [];
  datos_ahorros_gastos: any[] = [];
  data: any[] = [];
  customColorScheme = {
    domain: ['#FF0000', '#FF6666']
  };
  customColorgastos = {
    domain: ['#FF5733','#4CAF50']
  };

  

  constructor(private http: HttpClient, private platform: Platform, private userService: UserService, private loadingCtrl: LoadingController,
    private alertController: AlertController) { }

  mesSeleccionado: number = new Date().getMonth() + 1;
  anioSeleccionado: number = new Date().getFullYear();

  ngOnInit() {
    this.changeLegendPosition(false);
    this.handleScreenSizeChange();
    this.usuario = this.userService.getUsuario();
    console.log('usu:', this.usuario.dni);
    console.log('Mes seleccionado:', this.mesSeleccionado);
    console.log('Año seleccionado:', this.anioSeleccionado);
    this.Estadistica1();
    this.Estadistica_Anual();
    this.FormatearParaGauge();
    console.log('ESTADISTICA 1 :', this.data);
    console.log('ESTADISTICA 2 :', this.datos_anuales);
    console.log('Datos anuales:', this.datos_anuales);

    this.presentAlert('Éxito', 'Los registros se han cargado correctamente.');
  }
  handleRefresh(event: any) {

    this.Estadistica1();
    this.Estadistica_Anual();
    this.FormatearParaGauge();

    setTimeout(() => {
      // Finalizar el refresco
      event.target.complete();
    }, 1000);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleScreenSizeChange();
  }
  changeLegendPosition(defaultValue = true) {
    this.legendPosition = defaultValue ? LegendPosition.Right : LegendPosition.Below;
    this.below = !defaultValue;

  }
  handleScreenSizeChange() {
    const width = this.platform.width();
    const height = this.platform.height();
    console.log('Width:', width, 'Height:', height);
    if (width > height) {
      this.view = [0.679 * width, 0.379 * height];
    }
    else {
      this.view = [0.6795 * width, 0.3795 * height];
    }
  }
  

  meses: { nombre: string, valor: number }[] = [
    { nombre: 'Enero', valor: 1 },
    { nombre: 'Febrero', valor: 2 },
    { nombre: 'Marzo', valor: 3 },
    { nombre: 'Abril', valor: 4 },
    { nombre: 'Mayo', valor: 5 },
    { nombre: 'Junio', valor: 6 },
    { nombre: 'Julio', valor: 7 },
    { nombre: 'Agosto', valor: 8 },
    { nombre: 'Septiembre', valor: 9 },
    { nombre: 'Octubre', valor: 10 },
    { nombre: 'Noviembre', valor: 11 },
    { nombre: 'Diciembre', valor: 12 }
  ];
  anios: number[] = [2022, 2023, 2024];


  async actualizarGrafico() {
    console.log('Mes seleccionado:', this.mesSeleccionado);
    console.log('Año seleccionado:', this.anioSeleccionado);
    this.Estadistica1();
    this.Estadistica_Anual();
  }

  async Estadistica1() {
    const mes = this.mesSeleccionado;
    const anio = this.anioSeleccionado;

    const body = { year: anio, month: mes, dni: this.userService.getUsuario().dni };

    this.http.get<any>('http://192.168.1.247/estadisticas.php?query=estadistica1', { params: body }).subscribe(
      async (response) => {
        console.log('Respuesta del servidor:', response);
        console.log('dnipasado:', this.userService.getUsuario().dni);

        if (response != null && response.length > 0) {
          this.data = response;
          this.datos_salario_ahorros = this.filtrarDatos(response);

          const sumaGastos = response.reduce((total: number, item: any) => {
          
            if (item.name !== 'Salario Mensual' && item.name !== 'Ahorros e Inversiones') {
              total += parseFloat(item.value); 
            }
            return total;
          }, 0);

          this.datos_salario_ahorros.push({ name: 'Gastos', value: sumaGastos.toFixed(2) });
          this.datos_gastos = this.filtrarGastos(response);

        } else {
          this.presentAlert('Información', 'No existen registros a esa fecha.');
          this.data = [];
          this.datos_salario_ahorros = [];
          this.datos_gastos = [];
        }
      },
      (error) => {
        this.presentAlert('Error', 'Hubo un error al procesar la solicitud.');
      }
    );
  }

  filtrarDatos(data: any[]) {
    return data.filter(item => item.name === "Ahorros e Inversiones" || item.name === "Salario Mensual");
  }
  filtrarGastos(data: any[]) {
    return data.filter(item => item.name !== "Ahorros e Inversiones" && item.name !== "Salario Mensual");
  }

  async Estadistica_Anual() {
    const anio = this.anioSeleccionado;
    const dni = this.userService.getUsuario().dni;

    const url = `http://192.168.1.247/estadisticas.php`;

    const params = new HttpParams()
      .set('query', 'estadisticasanuales')
      .set('year', anio)
      .set('dni', dni);

    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    this.http.get<any[]>(url, { params }).subscribe(
      (response) => {
        if (response != null && response.length > 0) {
          const data2 = Array.from({ length: 12 }, (_, i) => {
            const mes = response.find(item => item.MES === i + 1);
            const gastos = mes ? parseFloat(mes.GASTOS) : 0;
            const ingresos = mes ? parseFloat(mes.INGRESOS_AHORROS) : 0;
            return {
              name: nombresMeses[i],
              series: [
                { name: 'gastos', value: gastos, extra: { code: 'gastos' } },
                { name: 'ingresos', value: ingresos, extra: { code: 'ingresos' } }
              ]
            };
          });

          this.datos_anuales = data2;
          console.log('Datos anuales:', this.datos_anuales);
          const totalGastos = response.reduce((total, item) => total + parseFloat(item.GASTOS), 0);
          const totalIngresosAhorros = response.reduce((total, item) => total + parseFloat(item.INGRESOS_AHORROS), 0);
          // Almacenar los totales en datos_ahorros_gastos
          this.datos_ahorros_gastos = [
            { name: 'Total de gastos anuales', value: totalGastos },
            { name: 'Total de ingresos/ahorros anuales', value: totalIngresosAhorros }
          ];

        } else {
          this.datos_anuales = [];
          this.datos_ahorros_gastos = [];
          return;
        }

      },
      (error) => {
        this.presentAlert('Error', 'Hubo un error al cargar los datos.');
      }
    );
  }

  async FormatearParaGauge() {
    const anio = this.anioSeleccionado;
    const dni = this.userService.getUsuario().dni;
    const url = `http://192.168.1.247/estadisticas.php`;
    const params = new HttpParams()
      .set('query', 'estadisticasanuales')
      .set('year', anio)
      .set('dni', dni);

    this.http.get<any[]>(url, { params }).subscribe(
      (response) => {
        if (response != null && response.length > 0) {
          this.datos_gauge = response.map(item => ({
            name: `Mes ${item.MES}`,
            value: parseFloat(item.GASTOS),
            extra: {}
          }));
        }
        else {

          this.datos_gauge = [];
          return;
        }
        console.log('Datos para el gauge:', this.datos_gauge);
      },
      (error) => {
        this.presentAlert('Error', 'Hubo un error al cargar los datos para el gauge.');
      }
    );
  }



  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }



}
