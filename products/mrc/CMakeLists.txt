cmake_minimum_required(VERSION 3.16)
project(MRC)

# Set C++ Standard
set(CMAKE_CXX_STANDARD 17)

# Specify Qt Installation Path
set(CMAKE_PREFIX_PATH "M:/Qt/6.8.1/mingw_64/lib/cmake")

# Find Qt Widgets
find_package(Qt6 REQUIRED COMPONENTS Widgets)

# Enable MOC processing for Qt Headers
set(CMAKE_AUTOMOC ON)

# Add Executable
add_executable(MRC 
    src/main.cpp 
    src/ui/MainWindow.cpp 
    src/ui/MainWindow.h
)

# Link Qt Libraries
target_link_libraries(MRC PRIVATE Qt6::Widgets)

# Include directories
target_include_directories(MRC PRIVATE src/ui)
