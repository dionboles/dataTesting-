from slackclient import SlackClient
slack_client = SlackClient('xoxb-209167995125-ZkxPOgg4SfYj9CGUf3Qn6sZs')
slack_client.api_call("auth.test")

def list_channels():
    channels_call = slack_client.api_call("channels.list")
    if channels_call.get('ok'):
        return channels_call['channels']
    return None

def userIM():
    usersim = slack_client.api_call("im.list")
    if usersim.get("ok"):
        print(usersim);
 
def send_message(channel_id, message):
    slack_client.api_call(
        "chat.postMessage",
        channel=channel_id,
        text=message,
        username='spacebot2',
        icon_emoji=':robot_face:'
    )

def join_channel(channel_id):
    slack_client.api_call("channels.join",channel=channel_id)

channels = list_channels()
# if channels:
#     print("Channels: ")
#     for c in channels:
#         print(c['name'] + " (" + c['id'] + ")")
#         if c['name'] == "tes":
#             print("write message")
#             data = input()
#             join_channel(c['name'])
#             send_message(c['id'], data)
#     else:
#         print("Unable to authenticate.")


userIM()

send_message("@azconerly ","hi")