#include<iostream>
#include <string>
#include<vector>
 using namespace std;
int main(int argc,char** argv){
   double principal, insterst,rate ,time ;
   cout << "What enter your principal "<<endl;
   cin >> principal;
   cout << "what your entered " << principal<<endl;
   cout << "What enter your rate "<<endl;
   cin >> rate;
   cout << "what your entered " << rate<<endl;
   cout << "What enter your time "<<endl;
   cin >> time;
   cout << "what your entered " << time<<endl;
   insterst = principal * rate* time;
   cout << "Your interst rate is "<< insterst<<endl;
   return 0;
}