#include "MainWindow.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication app(argc, argv);
    
    // Apply Dark Mode
    app.setStyleSheet("QMainWindow { background-color: #0e0f10; }");

    MainWindow window;
    window.show();
    return app.exec();
}
