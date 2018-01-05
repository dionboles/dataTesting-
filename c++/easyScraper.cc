#include <iostream>
#include <string>
#include <fstream>
#include <curl/curl.h>
using namespace std;

static size_t WriteCallback(void * contents, size_t size, size_t nmeb, void * userp){
    ((string *)userp)->append((char *)contents,size * nmeb);
    return size * nmeb;
}

string easyScrap(string url){
    string readBuffer;
    if(url != ""){
        CURL * curl;
        CURLcode res;
        curl = curl_easy_init();
        if(curl){
            curl_easy_setopt(curl, CURLOPT_URL,url.c_str());
            curl_easy_setopt(curl,CURLOPT_WRITEFUNCTION,WriteCallback);
            curl_easy_setopt(curl,CURLOPT_WRITEDATA, &readBuffer);
            res = curl_easy_perform(curl);
            curl_easy_cleanup(curl);
            
        }
    }else{
        return"";
    }
        return readBuffer;
}
int main(int argc,char** argv){
    string url;
    if (argv[1] == nullptr && url == ""){
        cout << "please enter url you want to download"<<endl;
        cin >> url;
    }else{
        url = argv[1];
    }
    ofstream outFile;
    outFile.open("data.html");
    string data = easyScrap(url);
    outFile << data.c_str() << endl;
    cin.ignore().get();
    return 0;
}