from .chat_bot import bot
from django.http import JsonResponse
import json # handle post data
import time # for response time
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie

# @ensure_csrf_cookie
@csrf_exempt
def send_message(request):
  '''
  take the message from the request body and give it to the chat bot
  in order to generate a response
  '''

  if request.method != 'POST':
    print('that was weird')
    return JsonResponse({'data': 'you are on the naughty list now'})

  data = json.loads(request.body.decode('utf-8'))
  print('data:', data) 
  message = data['message']['text']
  bot_message = bot.generate_response(message)

  bot_response = {
    'message' : {
      'uid': 'Jed',
      'text': bot_message,
      'created_at': time.time()
    }
  }
  '''
    added for realistic amount of response time
    actually this will proabably cause the server to time out lol
    maybe sleep for x amount of miliseconds to make it seem real
  '''
  response_time = bot.get_response_time(message, bot_message)
  time.sleep(response_time)

  return JsonResponse({'body': bot_response})