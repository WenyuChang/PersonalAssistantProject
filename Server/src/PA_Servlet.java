
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class PA_Servlet
 */
public class PA_Servlet extends HttpServlet
{
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public PA_Servlet()
	{
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		// TODO Auto-generated method stub
		//String op = request.getParameter("op");
		//String latitude = request.getParameter("lat");
		//String longitude = request.getParameter("long");
		
		PrintWriter out = response.getWriter();
		out.write("ccccccc");
		out.close();
//		if(op.equals("getRequests"))
//		{
//			System.out.println("get requests");
//			PrintWriter out=response.getWriter();
//			out.write("changwy test!");
//			out.close();
//		}
//		else
//		{
//			System.out.println("request:\nOP:" + op + "\nLatitude:" + latitude + "\nLongitude:" + longitude);
//			saveRequest(op, latitude, longitude);
//		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException
	{
		// TODO Auto-generated method stub
		this.doGet(request, response);
	}
	
	private void saveRequest(String op, String latitude, String longitude)
	{
		
	}

	private void getRequests()
	{
		
	}
}
