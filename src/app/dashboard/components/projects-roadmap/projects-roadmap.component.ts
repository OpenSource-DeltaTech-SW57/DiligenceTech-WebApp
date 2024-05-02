import { Component, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexPlotOptions, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    colors: string[];
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    grid: ApexGrid;
};

@Component({
  selector: 'app-projects-roadmap',
  templateUrl: './projects-roadmap.component.html',
  styleUrl: './projects-roadmap.component.scss'
})

export class ProjectsRoadmapComponent {

    @ViewChild("chart") chart!: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: "Projects",
                    data: [45, 40, 52, 63, 80, 88]
                }
            ],
            chart: {
                type: "bar",
                height: 360,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#796df6"
            ],
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '14px'
                }
            },
            xaxis: {
                categories: [
                    "Project Planning",
                    "Requirement",
                    "Design",
                    "Development",
                    "Testing and QA",
                    "Post-Launch"
                ],
                axisBorder: {
                    show: true,
                    color: '#e0e0e0'
                },
                axisTicks: {
                    show: true,
                    color: '#e0e0e0'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: "#919aa3",
                        fontSize: "14px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#e0e0e0'
                },
                axisTicks: {
                    show: false,
                    color: '#e0e0e0'
                }
            },
            grid: {
                strokeDashArray: 5,
                borderColor: "#f4f6fc",
                row: {
                    colors: ["#f4f6fc", "transparent"],
                    opacity: 0.5
                }
            }
        };
    }

}
