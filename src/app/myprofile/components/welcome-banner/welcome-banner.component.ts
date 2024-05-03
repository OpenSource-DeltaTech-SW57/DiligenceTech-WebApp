import { Component, ViewChild } from '@angular/core';
import { ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { CustomizerSettingsService } from '../../../shared/services/customizer-settings.service';
import { DatePipe } from '@angular/common';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    colors: string[];
    fill: ApexFill;
};

@Component({
  selector: 'app-welcome-banner',
  templateUrl: './welcome-banner.component.html',
  styleUrl: './welcome-banner.component.scss'
})
export class WelcomeBannerComponent {
    @ViewChild("chart") chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;
    currentDate: any;

    // isToggled
    isToggled = false;

    constructor(
        private datePipe: DatePipe,
        public themeService: CustomizerSettingsService
    ) {
        this.currentDate = this.datePipe.transform(new Date(), 'MMMM d, yyyy');
        this.chartOptions = {
            series: [75],
            chart: {
                type: "radialBar",
                height: 240
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#ffcc80",
                        strokeWidth: "100%",
                        margin: 3, // margin is in pixels
                        dropShadow: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "25px",
                            fontWeight: 500,
                            color: "#ffffff"
                        }
                    }
                }
            },
            colors: [
                "#00cae3"
            ]
        };
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
