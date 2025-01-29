#include "MainWindow.h"
#include <QPushButton>
#include <QGridLayout>
#include <QLabel>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent),
      buttonLabels({"RWS", "UP", "DOWN", "60°", "GM", "LOAD PIC",
                    "RTE", "BULL", "TC OFF", "TWS", "TWS ELEV", "LOAD DATA"}),
      bottomLabels({"ECM ON", "IRS", "WPN", "CONN", "OFF"})
{

    QWidget *centralWidget = new QWidget(this);
    setCentralWidget(centralWidget);

    // Ensure QGridLayout is explicitly parented to centralWidget
    QGridLayout *layout = new QGridLayout(centralWidget);

    // Create Radar Display
    QLabel *radarScreen = new QLabel("Radar Display", this);
    radarScreen->setStyleSheet("background-color: black; color: yellow; font-size: 18px;");
    radarScreen->setFixedSize(400, 400);
    layout->addWidget(radarScreen, 0, 1, 4, 4);

    // Create buttons (left & right)
    int row = 0;
    for (const QString &label : buttonLabels)
    {
        QPushButton *btn = new QPushButton(label, this);
        btn->setStyleSheet("background-color: black; color: yellow; font-size: 14px;");
        btn->setFixedSize(80, 40);

        if (row < 6)
            layout->addWidget(btn, row, 0);
        else
            layout->addWidget(btn, row - 6, 5);

        row++;
    }

    // Bottom buttons
    for (int i = 0; i < bottomLabels.size(); i++)
    {
        QPushButton *btn = new QPushButton(bottomLabels[i], this);
        btn->setStyleSheet("background-color: black; color: yellow; font-size: 14px;");
        btn->setFixedSize(80, 40);
        layout->addWidget(btn, 6, i + 1);
    }

    // Ensure the layout is correctly assigned
    setFixedSize(600, 500);
} 

MainWindow::~MainWindow()
{
}
