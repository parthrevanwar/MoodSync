# app.py
from flask import Flask, request, jsonify
from emotion_analyzer import EmotionAnalyzer
import os
from werkzeug.utils import secure_filename
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure upload settings
UPLOAD_FOLDER = 'temp_uploads'
ALLOWED_EXTENSIONS = {'wav', 'mp3', 'ogg'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Initialize emotion analyzer
analyzer = EmotionAnalyzer()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'model_loaded': True
    })

@app.route('/analyze', methods=['POST'])
def analyze_audio():
    try:
        # Check if file was uploaded
        if 'file' not in request.files:
            return jsonify({
                'status': 'error',
                'message': 'No file provided'
            }), 400

        file = request.files['file']
        
        # Check if a file was selected
        if file.filename == '':
            return jsonify({
                'status': 'error',
                'message': 'No file selected'
            }), 400

        # Check file type
        if not allowed_file(file.filename):
            return jsonify({
                'status': 'error',
                'message': f'File type not allowed. Allowed types: {ALLOWED_EXTENSIONS}'
            }), 400

        try:
            # Save file temporarily
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Analyze the audio
            result = analyzer.analyze_audio_file(filepath)
            
            # Clean up
            os.remove(filepath)
            
            return jsonify(result)

        except Exception as e:
            logger.error(f"Analysis error: {str(e)}")
            return jsonify({
                'status': 'error',
                'message': f'Analysis failed: {str(e)}'
            }), 500

    except Exception as e:
        logger.error(f"Request processing error: {str(e)}")
        return jsonify({
            'status': 'error',
            'message': f'Request processing failed: {str(e)}'
        }), 500

@app.route('/emotions', methods=['GET'])
def get_emotions():
    """Get list of supported emotions"""
    return jsonify({
        'status': 'success',
        'emotions': analyzer.emotions
    })

@app.errorhandler(413)
def request_entity_too_large(error):
    return jsonify({
        'status': 'error',
        'message': 'File too large. Maximum size is 16MB'
    }), 413

if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    logger.info("Starting Flask server...")
    logger.info("Emotion analyzer initialized successfully")
    
    app.run(host='0.0.0.0', port=5011, debug=True)