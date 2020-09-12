import markdown


def getMarkdownMeta(markdownFilePath):
    markdownFile = readMarkdownFile(markdownFilePath)
    metaRaw = markdownFile.Meta
    metaCleaned = cleanMeta(metaRaw)
    return metaCleaned


def cleanMeta(dictionary):
    return {key: dictionary[key][0] for key in dictionary}


def readMarkdownFile(markdownFilePath):
    with open(markdownFilePath, "r", encoding="utf-8") as input_file:
        text = input_file.read()
    md = markdown.Markdown(extensions=['meta'])  # Include meta info
    html = md.convert(text)
    return md
