#include <iostream>
#include <string>
typedef struct node{
    int id;
    std::string label;
    struct node *next;
}node;

class linked_lists{
    private:
        node * head, *tail;
    public:
        linked_lists(){
            head = nullptr;
            tail = nullptr;
        }
        void add_node(int n,std::string lab){
            node *tmp = new node;
            tmp -> id = n;
            tmp -> label = lab;

            if(head == nullptr){
                head = tmp;
                tail = tmp;
            }else{
                tail -> next = tmp;
                tail = tail -> next;
            }
        }

        node* gethead(){
            return head;
        }
        void prints(node * head){
                if(head == nullptr){
                    std::cout << "Null" <<std::endl;
                }else{
                    std::cout << head -> id <<std::endl;
                    std::cout << head -> label <<std::endl;
                    prints(head->next);
                }
            }
};
int main(){
    linked_lists a;
    a.add_node(1,"test");
    a.add_node(2,"tess");
    a.prints(a.gethead());
    return 0;
}