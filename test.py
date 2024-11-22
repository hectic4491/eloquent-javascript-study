def stringToNum(numString: str) -> int:
  try:
    if numString.isnumeric():
      return int(numString)
    else:
      print("Input a numeric string!")
  except AttributeError:
    print("Wrong argument type!")


def sumList(list: list) -> int:
  output = 0
  for n in list:
    try:
      output += n
    except TypeError:
      print("List contains a non integer type. Sum will skip this element.")
  return output

print(sumList([2, 6, 12, True]))