import os
from flask import Flask, request, jsonify
from flask_cors import CORS 
from langchain.document_loaders import PyMuPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.vectorstores.faiss import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

openai_api_key = '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'

os.environ["OPENAI_API_KEY"] = openai_api_key

pdf_path = r"C:\Users\Dhanush\Desktop\css\plantdetect\src\files\final pdf.pdf"

loader = PyMuPDFLoader(pdf_path)
documents = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=64)
texts = text_splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()
index = FAISS.from_documents(texts, embeddings)
retriever = index.as_retriever()

llm = ChatOpenAI(model_name='gpt-3.5-turbo', temperature=0)
qa = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)

# Flask app
app = Flask(__name__)
CORS(app, resources={r"/query": {"origins": "*"}}) 
@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    user_input = data['query']
    query = f"###Prompt: {user_input}"
    try:
        llm_response = qa(query)
        response = jsonify({'result': llm_response["result"]})
        response.headers.add("Access-Control-Allow-Origin", "*")  
        return response
    except Exception as err:
        return jsonify({'error': str(err)})

if __name__ == '__main__':
    app.run(debug=True, port=5001) 
