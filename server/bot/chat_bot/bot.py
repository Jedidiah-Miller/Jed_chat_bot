import nltk
# I dont fully understand why I had to do this but it worked
nltk.download('punkt')
from nltk.stem.lancaster import LancasterStemmer
import numpy
import tflearn
import tensorflow
import random
import json
import pickle
import os

stemmer = LancasterStemmer()
'''
use the absolute file path to the files
this is super annoying but it's the only way I got it to work
'''
ABS_DIR_PATH = os.path.dirname(os.path.abspath(__file__)) + '/'
'''
  json data for the bot to train from
'''
intents_file_path = ABS_DIR_PATH + 'intents.json'
'''
  data saved from the tensorflow model
'''
pickle_data = ABS_DIR_PATH + 'data.pickle'
'''
  tensorflow learn model
'''
tflearn_model = ABS_DIR_PATH + 'model.tflearn'

with open(intents_file_path) as file:
  data = json.load(file)


try:

  with open("data.pickle", "rb") as f:
    words, labels, training, output = pickle.load(f)

except Exception as e:

  print('Exception opening data.pickle: ', e)

  words  = []
  labels = []
  docs_x = []
  docs_y = []

  # get all useful data
  for intent in data["intents"]:
    for pattern in intent["patterns"]:

      wrds = nltk.word_tokenize(pattern)
      words.extend(wrds)

      docs_x.append(wrds)
      docs_y.append(intent["tag"])

      if intent["tag"] not in labels:
        labels.append(intent["tag"])

  # remove duplicate entries
  # lowercase everything
  words = [stemmer.stem(w.lower()) for w in words if w not in "?"]
  words = sorted(list(set(words)))

  labels = sorted(labels)

  training = []
  output = []

  out_empty = [0 for _ in range(len(labels))]

  for x, doc in enumerate(docs_x):

    bag = []

    wrds = [stemmer.stem(w) for w in doc]

    for w in words:
      if w in wrds:
        bag.append(1)
      else:
        bag.append(0)

    output_row = out_empty[:]
    output_row[labels.index(docs_y[x])] = 1

    training.append(bag)
    output.append(output_row)


  training = numpy.array(training)
  output = numpy.array(output)

  with open(pickle_data, "wb") as f:
    pickle.dump((words, labels, training, output), f)

# create the Model
# reset all previous settings
tensorflow.reset_default_graph()
# define the input shape we are expection for our model
net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8) # 8 neurons for this layer
net = tflearn.fully_connected(net, 8) # 8 neurons for this layer
# allow us to get probabilities for each output
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)


'''
if there has recently been an update to the intents file
or whatever form of JSON object i am using, make sure the
bot retrains itself 1000 more times
'''

# you have to run the program once before using the try / except method - use everything from the except clause
try:
  model.load(tflearn_model) # here
except Exception as e:
  print('GNARLY EXCEPTION ', e)
  # train the model if neccessary
  # view the data 1000 times
  model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
  model.save(tflearn_model) # also here

def bag_of_words(s, words):

  bag = [0 for _ in range(len(words))]

  s_words = nltk.word_tokenize(s)
  s_words = [stemmer.stem(word.lower()) for word in s_words]

  for se in s_words:
    for i, w in enumerate(words):
      # if the current word is equal to the word in the sentence
      if w == se:
        bag[i] = 1

  return numpy.array(bag)


def generate_response(inp: str):
  '''
  take the user input from the app and find an appropprate response. 
  if there is not an appropriate response - we respond that we are confusion
  * inp a message sent from the user
  '''

  results = model.predict([bag_of_words(inp, words)])[0]
  results_index = numpy.argmax(results)
  tag = labels[results_index]

  # if the result is more than 70% confident
  if results[results_index] > 0.7:
    for tg in data["intents"]:
      if tg["tag"] == tag:
        responses = tg["responses"]
    return random.choice(responses)
  else:
    return get_confused_response()


def get_initial_greeting():
  return random.choice([
    'Hi, thanks for taking the time to chat with me, feel free to ask any questions regarding my programming experience',
    'Ask me anything about my programming experience',
    'what can I answer for you'
  ])


def get_confused_response():
  return random.choice([
    "I don't understand",
    'I am not sure how to answer that',
    'I am confusion'
  ])


def get_response_time(message: str, bot_repsonse: str):
  '''
  realistic response time to give the impression of a real conversation.
  otherwise the server would send a response almost instantly - muy rapido
  '''
  seconds = len(message) + len(bot_repsonse)

  seconds /= 5

  print('response time: ', seconds)
  return seconds


def init_terminal_bot():
  while True:
    inp = input('You: ')
    if inp == 'quit':
      break
    response = generate_response(inp)
    print('Jed: ', response)


print('I am the smart')