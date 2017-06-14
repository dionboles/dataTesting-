#include <iostream>
#include <string>
using namespace std;
int main(int argc, char** argv){
    string answer = argv[1];
    if(answer == "help"){
        cout << "What do you need"<<endl;
        cin >> answer;
        if(answer == "file"){
            cout << "do you want me to make a file"<<endl;
            cin >> answer;
            if(answer == "yes"){
                cout<< "ok"<<endl;
            }
        }
    }else{
          cout << "Sorry i don't know"<<endl;
    }
}